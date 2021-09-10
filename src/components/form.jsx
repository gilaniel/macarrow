import React, { useEffect, useState } from "react"
import { useIntl } from "react-intl"
import IMask from "imask"

import Euro from "../images/euro.svg"
import Rub from "../images/rub.svg"

const Form = ({ onClick }) => {
  const { locale: currentLocale, formatMessage } = useIntl()

  function resetForm() {
    return { budget: "", description: "", phone: "", email: "" }
  }

  const [form, setForm] = useState(resetForm())

  const handleInputChange = e => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSendClick = async () => {
    try {
      await onClick(form)
      setForm(resetForm())
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const element = document.querySelector(".phone")
    const maskOptions = {
      mask: /^[\d ()+]+$/,
    }

    IMask(element, maskOptions)
  }, [])

  return (
    <div
      className="form"
      data-sal="fade"
      data-sal-delay="300"
      data-sal-duration="800"
    >
      <textarea
        name="description"
        className="input textarea"
        onChange={handleInputChange}
        value={form.description}
      ></textarea>

      <div className="df ai-center form-items">
        <div className="form-item budget-item ">
          <label className="fs-21 ls-18 fw-normal grey-color form-label">
            {formatMessage({ id: "budget" })}
          </label>
          <div className="df ai-center">
            <div style={{ flexBasis: "100%" }}>
              <input
                type="text"
                name="budget"
                className="input input__text"
                onChange={handleInputChange}
                value={form.budget}
              />
            </div>
            <img
              src={currentLocale === "en" ? Euro : Rub}
              alt="Macarrow"
              className="ml-20"
            />
          </div>
        </div>

        <div className="df jc-end ml-auto form-items form-items__group">
          <div className="form-item form-item__phone">
            <label className="fs-21 ls-18 fw-normal grey-color form-label">
              {formatMessage({ id: "phone" })}
            </label>
            <div>
              <input
                type="text"
                name="phone"
                className="input input__text phone"
                onChange={handleInputChange}
                value={form.phone}
              />
            </div>
          </div>

          <div className="form-item">
            <label className="fs-21 ls-18 fw-normal grey-color form-label">
              {formatMessage({ id: "email" })}
            </label>
            <div>
              <input
                type="text"
                name="email"
                className="input input__text"
                onChange={handleInputChange}
                value={form.email}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="df jc-center">
        <button className="button sm js-send-btn" onClick={handleSendClick}>
          {formatMessage({ id: "send" })}
        </button>
      </div>
    </div>
  )
}

export default Form
