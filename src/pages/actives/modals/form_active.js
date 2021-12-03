import { useEffect, useState } from "react";
import { activeService } from "../../../services/active.service";
import { investmentCategoryService } from "../../../services/investment-category.service";
import { closeAllModals } from "../../../services/modal.service";

const ModalFormActive = (props) => {
  const [id, setId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [ticket, setTicket] = useState("");
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const initialize = async () => {
      await listInvestmentCategories();
    };
    initialize();
  }, []);

  useEffect(() => {
    document.getElementById("formActive").reset();
    setAlert({ show: false, message: "" });

    if (props.selected.id) {
      setId(props.selected.id);
      setCategoryId(props.selected.id_investment_category);
      setTicket(props.selected.ticket);
      setDescription(props.selected.description);
    } else {
      setId(0);
      setTicket("");
      setDescription("");
      setCategoryId(0);
    }
  }, [props.selected]);

  const showAlert = (message) => {
    setAlert({ show: true, message: message });
  };

  const closeModal = () => {
    closeAllModals();
  };

  const listInvestmentCategories = async () => {
    try {
      var itens = await investmentCategoryService.getAll();
      setCategories(itens);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (event) => {
    const { value } = event.target;
    setCategoryId(Number(value));
  };

  const save = async () => {
    if (categoryId === 0) {
      setAlert({ show: true, message: "Forneça o tipo" });
      return;
    }

    if (ticket && description) {
      setAlert({ show: false, message: "" });

      var payload = {
        id: id,
        categoryId: categoryId,
        ticket: ticket,
        description: description,
      };

      //TODO: Validar se ja existe antes de salvar
      try {
        if (id === 0) await activeService.create(payload);
        else await activeService.update(payload);
        props.onSaved(true);

        // Toast
        // List
        // close modal
        closeModal();
      } catch (error) {
        props.onSaved(false);
        console.log(error);
      }
    } else {
      showAlert("Informe os valores");
    }
  };

  return (
    <>
      <div
        className='modal fade'
        id='modalFormActive'
        tabindex='-1'
        role='dialog'
        aria-hidden='true'>
        <div
          className='modal-dialog modal-dialog-centered modal-ls'
          role='document'>
          <div className='modal-content'>
            <div className='modal-body p-0'>
              <div className='card card-plain'>
                <div className='card-header pb-0 text-left'>
                  <h3 className='font-weight-bolder text-primary text-gradient'>
                    Registro de Ativo
                  </h3>
                </div>
                <div className='card-body pb-3'>
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

                  <form role='form text-left' id='formActive'>
                    <div class='form-group'>
                      <label for='investmentType'>Tipo</label>
                      <select
                        className='form-control'
                        id='investmentType'
                        value={categoryId}
                        onChange={handleCategory}>
                        <option value='0'>Tipo</option>
                        {categories &&
                          categories.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.description}
                            </option>
                          ))}
                      </select>
                    </div>

                    <label for='ticket'>Ativo</label>
                    <div className='input-group mb-3'>
                      <input
                        id='ticket'
                        type='text'
                        className='form-control'
                        placeholder='Nome dou chave do ativo (Ex: ITUB4)'
                        value={ticket}
                        onChange={(e) => setTicket(e.target.value)}
                      />
                    </div>

                    <label for='description'>Descrição</label>
                    <div className='input-group mb-3'>
                      <input
                        id='description'
                        type='text'
                        className='form-control'
                        placeholder='Descrição'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className='text-center'>
                      <button
                        type='button'
                        onClick={() => save()}
                        className='btn bg-gradient-primary btn-lg btn-rounded w-100 mt-4 mb-0'>
                        Salvar
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
    </>
  );
};

export default ModalFormActive;
