import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Popconfirm, Form, Modal } from "antd";
import Loading from "../Loading";
import InputMask from "react-input-mask";
import * as _ from "lodash";
import { newValidator } from "../../helpers";
import FormInput from "../FormInput";
import { isValidInput } from "../../utils/isValidInput";

const EditableContext = React.createContext();

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

function beforeMaskedStateChange({ nextState }) {
    let { value } = nextState;
    //if (value.endsWith("/")) {
    //    value = value.slice(0, -1);
    //}
    if (value.includes("991")) {
        value = "911";
    }
    return {
        ...nextState,
        value,
    };
}

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            if (inputRef.current.hasOwnProperty("getInputDOMNode")) {
                inputRef.current.getInputDOMNode().focus();
            } else {
                inputRef.current.focus();
            }
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log("Save failed:", errInfo);
        }
    };

    let childNode = children;
    let input;
    if (dataIndex === "phone") {
        input = (
            <InputMask
                placeholder="(123) 456-7890"
                ref={inputRef}
                mask="(999) 999-9999"
                alwaysShowMask={true}
                onBlur={save}
                beforeMaskedStateChange={beforeMaskedStateChange}
            />
        );
    } else {
        input = (
            <Input
                ref={inputRef}
                onPressEnter={save}
                onBlur={save}
                placeholder="Input name"
            />
        );
    }

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                {input}
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

class EmergencyServicesTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: "name",
                dataIndex: "name",
                width: "30%",
                //editable: true,
            },
            {
                title: "phone",
                dataIndex: "phone",
                //editable: true,
                //phone: true,
            },
            {
                title: "operation",
                dataIndex: "operation",
                render: (text, record) =>
                    this.state.items.length >= 1 ? (
                        <>
                            <button
                                className="disable-btn auto edit-btn"
                                onClick={() =>
                                    this.setState({
                                        editMode: true,
                                        editItemKey: record.key,
                                        isModalVisible: true,
                                        isDisablebtn: true,
                                    })
                                }
                            >
                                Edit
                            </button>
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => this.handleDelete(record.key)}
                            >
                                <button className="disable-btn auto">
                                    Delete
                                </button>
                            </Popconfirm>
                        </>
                    ) : null,
            },
        ];
        this.state = {
            items: [],
            toDelete: [],
            isModalVisible: false,
            emergency_services: {
                name: "",
                phone: "",
            },
            submitted: false,
            editMode: false,
            editItemKey: 0,
            isDisablebtn: false,
        };
        this.validator = newValidator();
    }

    handleDelete = (key) => {
        const items = [...this.state.items];
        const toDelete = this.state.toDelete;
        this.setState(
            {
                items: items.filter((item) => item.key !== key),
                toDelete: [...toDelete, items.find((item) => item.key === key)],
            },
            () => this.onSave()
        );
    };

    componentDidMount() {
        const { items } = this.props;
        if (items) {
            this.commitItems(items);
        }
    }

    commitItems = (items) => {
        this.setState({
            items: items.map((item) => ({
                key: item.id,
                ...item,
            })),
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.items !== this.props.items) {
            this.commitItems(this.props.items);
        }
    }

    handleSave = (row) => {
        const newData = [...this.state.items];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        this.setState({
            items: newData,
        });
    };

    onSave = () => {
        this.props.onSave(this.getSaveData());
    };

    getSaveData = () => {
        const { toDelete, items } = this.state;
        return [
            ...items,
            ...toDelete.map((i) => {
                i.delete = true;
                return i;
            }),
        ].map((item) => {
            //delete item.key;
            return item;
        });
    };

    showModal = () => {
        this.setState({
            isModalVisible: true,
        });
    };

    handleCancel = () => {
        this.setState({
            isModalVisible: false,
            editMode: false,
            isDisablebtn: false,
        });
    };

    handleStateChange = (field, value, action) => {
        if (action === "add") {
            const { emergency_services } = this.state;
            emergency_services[field] = value;
            this.setState({ emergency_services });
        } else {
            const index = this.state.items.findIndex(
                (item) => this.state.editItemKey === item.key
            );
            let items = [...this.state.items];
            let item = { ...items[index] };
            if (field === "name") item.name = value;
            else item.phone = value;
            items[index] = item;
            this.setState({ items, isDisablebtn: false });
        }
    };

    handleAdd = () => {
        const { items, emergency_services } = this.state;
        let key = this.state.key;
        if (!key) {
            key = items.length ? _.orderBy(items, "id", "desc")[0].id + 1 : 1;
        }
        const newData = {
            key,
            name: emergency_services.name,
            phone: emergency_services.phone,
        };
        this.setState(
            {
                items: [...items, newData],
                create: true,
                key: key + 1,
            },
            () => this.onSave()
        );
    };

    handleSubmit = (e) => {
        const { editMode } = this.state;
        e.preventDefault();
        if (this.validator.allValid()) {
            editMode ? this.onSave() : this.handleAdd();
            this.handleCancel();
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    };

    render() {
        const {
            items,
            isModalVisible,
            submitted,
            isDisablebtn,
            editMode,
            editItemKey,
        } = this.state;
        const { saving } = this.props;
        const {
            emergency_services: { name, phone },
        } = this.state;

        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        const editItemData = items.filter((item) => item.key === editItemKey);

        return (
            <div>
                <button
                    onClick={this.showModal}
                    type="button"
                    className="add-btn"
                    style={{
                        marginBottom: 16,
                    }}
                >
                    Add a row
                </button>
                <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    rowKey="id"
                    dataSource={items.filter((item) => !item.delete)}
                    columns={columns}
                />
                {isModalVisible && (
                    <Modal
                        width={"30%"}
                        visible={true}
                        onCancel={this.handleCancel}
                        wrapClassName={"account-modal"}
                        footer={null}
                    >
                        <div className="modal-right-head">
                            <h3>Emergency Services</h3>
                        </div>
                        <form
                            onSubmit={this.handleSubmit}
                            className={
                                "add-schedule add-schedule-without-details"
                            }
                        >
                            <div className="form-group">
                                <FormInput
                                    label="Name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={
                                        editMode ? editItemData[0].name : null
                                    }
                                    onChange={(e) =>
                                        this.handleStateChange(
                                            "name",
                                            e.target.value,
                                            editMode ? "edit" : "add"
                                        )
                                    }
                                    className={
                                        "form-control field-input " +
                                        isValidInput(
                                            "name",
                                            this.validator,
                                            submitted
                                        )
                                    }
                                />
                                {this.validator.message(
                                    "name",
                                    editMode ? editItemData[0].name : name,
                                    "required"
                                )}
                            </div>
                            <div className="form-group">
                                <FormInput
                                    phone={true}
                                    label="Phone"
                                    type="text"
                                    name="phone"
                                    placeholder="Phone"
                                    value={
                                        editMode ? editItemData[0].phone : null
                                    }
                                    onChange={(e) =>
                                        this.handleStateChange(
                                            "phone",
                                            e.target.value,
                                            editMode ? "edit" : "add"
                                        )
                                    }
                                    className={
                                        "form-control field-input " +
                                        isValidInput(
                                            "phone",
                                            this.validator,
                                            submitted
                                        )
                                    }
                                />
                                {this.validator.message(
                                    "phone",
                                    editMode ? editItemData[0].phone : phone,
                                    "required|phone"
                                )}
                            </div>
                            <div className="send-invitation">
                                <button
                                    disabled={
                                        isDisablebtn
                                            ? true
                                            : !this.validator.allValid()
                                    }
                                    className="submit-btn"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </Modal>
                )}
            </div>
        );
    }
}
export default EmergencyServicesTable;
