import React, { useEffect, useState } from "react";
import { activeService } from "../../services/active.service";

import ModalFormActive from "./modals/form_active";
import ModalImportActive from "./modals/import_active";
import ModalRemoveActive from "./modals/remove_modal";

import TableActives from "./partials/TableActives";

export const ActiveList = ({ match }) => {
  const [actives, setActives] = useState([]);
  const [selected, setSelected] = useState({});

  const columns = React.useMemo(() => [
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Tipo",
      accessor: "category",
    },
    {
      Header: "Ativo",
      accessor: "ticket",
    },
    {
      Header: "Descrição",
      accessor: "description",
    },
  ]);

  const listActives = async () => {
    var list = await activeService.getAll();
    if (list) {
      setActives(list);
    }
  };

  const onEdited = (saved) => {
    listActives();
  };
  const handleEdit = (item) => {
    setSelected(item);
  };

  useEffect(() => {
    const initialize = async () => {
      await listActives();
    };
    initialize();
  }, []);

  return (
    <>
      <ModalFormActive onSaved={onEdited} selected={selected} />
      <ModalImportActive onUploaded={onEdited} />
      <ModalRemoveActive onRemoved={onEdited} selected={selected} />

      <div className='row'>
        <div className='col-md-8 mt-4'>
          <div className='card'>
            <div className='card-header pb-0 p-3'>
              <div className='row'>
                <div className='col-6 d-flex align-items-center'>
                  <h6 className='mb-0'>Meus ativos</h6>
                </div>
                <div className='col-6 text-end'>
                  <div className='btn-group dropup   mb-0'>
                    <button
                      type='button'
                      className='btn btn-link text-dark px-3 mb-0'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'>
                      <i
                        className='fa fa-ellipsis-v  text-dark me-2'
                        aria-hidden='true'></i>
                    </button>
                    <ul
                      className='dropdown-menu px-2 py-3'
                      aria-labelledby='dropdownMenuButton'>
                      <li>
                        <button
                          className='dropdown-item border-radius-md'
                          onClick={() => handleEdit({})}
                          data-bs-toggle='modal'
                          data-bs-target='#modalFormActive'>
                          Novo
                        </button>
                      </li>
                      <li>
                        <button
                          className='dropdown-item border-radius-md'
                          data-bs-toggle='modal'
                          data-bs-target='#modalImportActive'>
                          Importar CSV
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className='card-body'>
              <div className='table-responsive p-0'>
                <TableActives
                  data={actives}
                  columns={columns}
                  editCallback={handleEdit}
                  removeCallback={handleEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
