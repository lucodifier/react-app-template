import { useEffect, useState } from "react";
import { activeService } from "../../../services/active.service";
import { closeAllModals } from "../../../services/modal.service";

const ModalRemoveActive = (props) => {
  const [id, setId] = useState(0);

  useEffect(() => {
    if (props.selected.id) {
      setId(props.selected.id);
    }
  }, [props.selected]);

  const closeModal = () => {
    closeAllModals();
  };

  const remove = async () => {
    try {
      if (id != 0) {
        await activeService.delete(id);
        props.onRemoved(true);
      }
      closeModal();
    } catch (error) {
      props.onRemoved(false);
      console.log(error);
    }
  };

  return (
    <>
      <div
        className='modal fade'
        id='modalRemoveActive'
        tabindex='-1'
        role='dialog'
        aria-hidden='true'>
        <div
          className='modal-dialog modal-danger modal-dialog-centered modal-'
          role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h6 className='modal-title' id='modal-title-notification'>
                Sua atenção é necessária
              </h6>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <div className='py-3 text-center'>
                <i className='ni ni-bell-55 ni-3x'></i>
                <h4 className='text-gradient text-danger mt-4'>
                  Você deveria ler isto!
                </h4>
                <p>
                  Ao remover o ativo ele não aparecerá mais como opção para
                  adicionar ao Portfólio. Os itens do Portfólio com este ativo
                  não serão removidos.
                </p>
                <p>Deseja realmente remover o ativo?</p>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-primary'
                onClick={remove}>
                Ok, entendi
              </button>
              <button
                type='button'
                className='btn btn-link  ml-auto'
                data-bs-dismiss='modal'>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalRemoveActive;
