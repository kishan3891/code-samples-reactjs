import { Row, Col } from "antd";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import classnames from 'classnames'
import useFocus from "../../hooks/useFocus";
import React from "react";

const url = "https://reconstruction.us17.list-manage.com/subscribe/post?u=345e9bde93ccd7eccc0a1650f&id=6d59c943c6";

interface Props {
  btnLabel: string;
  iid: string;
  labelTitle: string;
}

export default function Mailchimp({ btnLabel, iid, labelTitle }: Props) {
  return (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <CustomForm
          status={status}
          message={message}
          btnLabel={btnLabel}
          iid={iid}
          labelTitle={labelTitle}
          onValidated={(formData) => subscribe(formData)}
        />
      )}
    />
  );
}

interface PropsCustom {
  btnLabel: string;
  iid: string;
  labelTitle: string;
  status: string;
  message: any;
  onValidated: any;
}

const CustomForm = ({ status, message, onValidated, btnLabel, iid, labelTitle }: PropsCustom) => {

  const ref = React.useRef<HTMLInputElement>(null);
  const focused = useFocus(ref);

  let email: string;
  const submit = (event) => {
    event.preventDefault();
    if (ref.current !== undefined) {
      email = ref.current.value;
    }
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email
      });
  }

  return (
    <>
      {status !== null ? (
        <div
          style={{
            paddingTop: 20,
            maxWidth: 600,
            margin: "0 auto",
          }}
          className="response-wrapper"
        >
          {status === "sending" && (
            <div style={{ color: "#fff" }}>sending...</div>
          )}
          {status === "error" && (
            <div
              style={{ color: "#fff" }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
          {status === "success" && (
            <div
              style={{ color: "#fff" }}
              dangerouslySetInnerHTML={{ __html: message }}
            />
          )}
        </div>
      ) : (
        <div
          className={classnames(
            "mailchimp__wrapper",
            focused ? "is-focused" : null
          )}
        >
          <form onSubmit={submit}>
            <Row align="middle">
              <Col sm={15} xs={13}>
                <div className="inputWrapper">
                  <label htmlFor={iid}>{labelTitle}</label>
                  <input
                    required={true}
                    ref={ref}
                    type="email"
                    id={iid}
                    placeholder="email@example.com"
                  />
                </div>
              </Col>
              <Col sm={9} xs={11}>
                <button
                  type="submit"
                  className="button-primary-l mailchimp-btn"
                >
                    {btnLabel}
                </button>
                </Col>
              </Row>
            </form>
          </div>
        )}
    </>
  );
};
