import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import CreateOffer from "../CreateOffer/CreateOffer";
import { BsXLg } from "react-icons/bs";

const CenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div style={{ backgroundColor: "#f5f5f5" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
            paddingRight: "20px",
          }}
        >
          <h1 style={{ opacity: "0" }}>.</h1>
          <h4 style={{ margin: "0px 0 50px 0" }}>CUSTOMIZED OFFER</h4>
          <div style={{ textAlign: "right", margin: "0px" }}>
            <BsXLg onClick={props.onHide} />
          </div>
        </div>
        <CreateOffer  hidemodel={props.setModalShow} showmodel={props.show}/>
      </div>
    </Modal>
  );
};

export default CenteredModal;
