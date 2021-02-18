import ActiveLink from "@components/common/activeLink";
import ModalLogin from "@components/common/ModalLogin";
import { Menu } from "antd";
import { useState } from "react";
import useAuth, { handleLogout } from "../../hooks/useAuth";
import { ENABLED_FEATURES } from "../../lib/helpers";
import { DropDownArrow } from '@components/icons/drop-down-arrow';

const { SubMenu } = Menu;

export default function RightMenu({ mode }) {
    const [visible, showModal] = useState(false);
    const { user } = useAuth();

    return (
        <>
            <Menu
                mode={mode}
                className="header-menu"
                style={{
                    background: 'inherit',
                }}
            >
                <Menu.Item>
                    <ActiveLink children={`Courses`} href="/courses" className={null} />
                </Menu.Item>
                <SubMenu title="Curriculum" icon={<DropDownArrow />}>
                    <Menu.Item>
                        <ActiveLink children={`Shorties`} href="/curriculum/shorties" className={null} />
                    </Menu.Item>
                    <Menu.Item>
                        <ActiveLink children={`Youngins`} href="/curriculum/youngins" className={null} />
                    </Menu.Item>
                    <Menu.Item>
                        <ActiveLink children={`Gen Z`} href="/curriculum/genz" className={null} />
                    </Menu.Item>
                </SubMenu>

                <SubMenu title="About Us" icon={<DropDownArrow />}>
                    <Menu.Item>
                        <ActiveLink children={`About Us`} href="/about" className={null} />
                    </Menu.Item>
                    <Menu.Item>
                        <ActiveLink children={`Work With Us`} href="/work-with-us" className={null} />
                    </Menu.Item>
                    <Menu.Item>
                        <ActiveLink children={`Volunteer With Us`} href="/volunteer-with-us" className={null} />
                    </Menu.Item>
                </SubMenu>

                {user && (
                    <SubMenu title="Account" className="account-menu" icon={<DropDownArrow />}>
                        <Menu.Item>
                            <ActiveLink children={`My Schedule`} href="/account/schedule" className={null} />
                        </Menu.Item>
                        <Menu.Item>
                            <ActiveLink children={`My Courses`} href="/account/courses" className={null} />
                        </Menu.Item>
                        <Menu.Item>
                            <button onClick={handleLogout}>Log Out</button>
                        </Menu.Item>
                    </SubMenu>
                )}
                {!user && (
                    <Menu.Item>
                        <button onClick={() => showModal(true)} className="button-secondary-nav">
                            Login
                        </button>
                    </Menu.Item>
                )}
            </Menu>
            {!user && <ModalLogin visible={visible} showModal={showModal} conntainerID={1} />}
        </>
    );
}
