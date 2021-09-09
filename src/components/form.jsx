import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl';
import IMask from "imask"

import Euro from '../images/euro.svg'
import Rub from '../images/rub.svg'

const Form = ({ onClick }) => {
  const { locale: currentLocale, formatMessage } = useIntl();

  const [form, setForm] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSendClick = () => {
    onClick(form)
  }

  useEffect(() => {
    const element = document.querySelector('.phone');
    const maskOptions = {
      mask: /^[\d ()+]+$/
    };

    IMask(element, maskOptions);
  }, [])

  return (
    <div className="form" data-sal="fade" data-sal-delay="300" data-sal-duration="800">
      <textarea name="description" className="input mb-60" onChange={handleInputChange}></textarea>

      <div className="df ai-center">
        <div className="form-item budget-item ">
          <label className="fs-21 ls-18 fw-normal grey-color">{formatMessage({ id: 'budget' })}</label>
          <div className="df ai-center mt-20">
            <div style={{ flexBasis: '100%' }}>
              <input type="text" name="budget" className="input input__text" onChange={handleInputChange} />
            </div>
            <img src={currentLocale === 'en' ? Euro : Rub} alt="Macarrow" className="ml-20" />
          </div>
        </div>

        <div className="df jc-end ml-auto" style={{ width: '60%' }}>
          <div className="form-item mr-25">
            <label className="fs-21 ls-18 fw-normal grey-color">{formatMessage({ id: 'phone' })}</label>
            <div className="mt-20">
              <input type="text" name="phone" className="input input__text phone" onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-item">
            <label className="fs-21 ls-18 fw-normal grey-color">{formatMessage({ id: 'email' })}</label>
            <div className="mt-20">
              <input type="text" name="email" className="input input__text" onChange={handleInputChange} />
            </div>
          </div>
        </div>
      </div>

      <div className="df jc-center">
        <button className="button sm mt-60 js-send-btn" onClick={handleSendClick}>{formatMessage({ id: 'send' })}</button>
      </div>
    </div>
  )
}

export default Form;