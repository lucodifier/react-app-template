import { useEffect, useState } from "react";

// Services
import { activeService } from "../../../services/active.service";

// Helpers
import { closeAllModals } from "../../../services/modal.service";
import modelo from "../../../assets/templates/actives.csv";

const ModalImportActive = (props) => {
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [file, setFile] = useState(null);

  useEffect(() => {}, []);

  // const handleAmount = (event) => {
  //   var value = event.target.value;
  // };

  const closeModal = () => {
    closeAllModals();
  };

  const upload = async () => {
    try {
      const dataForm = new FormData();
      dataForm.append("csvfile", file.selectedFile);

      await activeService.upload(dataForm);

      closeModal();
      props.onUploaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onFileChange = (event) => {
    setFile({ selectedFile: event.target.files[0] });
  };

  const showAlert = (message) => {
    setAlert({ show: true, message: message });
  };

  return (
    <div
      className='modal fade'
      id='modalImportActive'
      tabindex='-1'
      role='dialog'
      aria-hidden='true'>
      <div
        className='modal-dialog modal-dialog-centered modal-ls'
        role='document'>
        <div className='modal-content'>
          <div className='modal-body p-0'>
            <div className='card card-plain'>
              <div
                className='card-header pb-0 text-left align-midle'
                style={{ textAlign: "center" }}>
                <h3 className='font-weight-bolder text-primary text-gradient'>
                  Importar ativos
                </h3>
                <p className='mb-0'>
                  Adicione um arquivo csv no formato deste{" "}
                  <a
                    class='btn btn-primary btn-lg active'
                    role='button'
                    aria-pressed='true'
                    href={modelo}>
                    Modelo{" "}
                  </a>
                </p>

                <div
                  className='alert alert-warning alert-dismissible fade show'
                  role='alert'
                  style={
                    alert.show ? { display: "block" } : { display: "none" }
                  }>
                  <span className='alert-icon'>
                    <i className='ni ni-bell-55'></i>
                  </span>
                  <span className='alert-text'>{alert.message}</span>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setAlert({ show: false, message: "" })}
                    aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
              </div>

              <div className='card-body pb-3'>
                <form role='form text-left'>
                  <label>Arquivo CSV</label>
                  <div className='input-group mb-3'></div>
                  <input type='file' onChange={onFileChange} />
                  <div className='text-center'>
                    <button
                      disabled={file ? false : true}
                      type='button'
                      onClick={async () => upload()}
                      className='btn bg-gradient-primary btn-lg btn-rounded w-100 mt-4 mb-0'>
                      Importar
                    </button>
                  </div>
                </form>
              </div>
              <div className='card-footer text-center pt-0 px-sm-4 px-1'>
                <p className='mb-4 mx-auto'>
                  <a
                    data-bs-dismiss='modal'
                    href='javascrpt:;'
                    className='text-primary text-gradient font-weight-bold'>
                    Cancelar
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalImportActive;
