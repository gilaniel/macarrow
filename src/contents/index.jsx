import React, { useState } from "react"
import { Link } from "gatsby"
import { useIntl } from "react-intl"

import Anchor from "../components/anchor"
import Seo from "../components/seo"

import FooterLogo from "../images/footer_logo.svg"
import GalleryImg from "../images/gallery.png"
import Insta from "../images/insta.svg"
import About from "../images/about_logo.png"

import Video from "../video/Misha_inst_bit_2.mp4"
import Poster from "../images/banner.png"

import Form from "../components/form"
import { Button, Modal } from "react-bootstrap"

const Home = () => {
  const { locale, formatMessage } = useIntl()

  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const sendMessage = async form => {
    const currency = locale === "en" ? " euro" : " руб."

    const newForm = { ...form }

    newForm.budget = form.budget + currency

    try {
      await fetch("http://localhost:3000/message", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(newForm),
        headers: {
          "Content-Type": "application/json",
        },
      })

      setShow(true)
    } catch (e) {
      throw e.message
    }
  }

  return (
    <>
      <Seo title="Maccarow studio" />

      <div
        className="banner-container"
        data-sal="fade"
        data-sal-duration="500"
        data-sal-duration="1000"
      >
        <video loop muted autoPlay playsInline poster={Poster}>
          <source src={Video} type="video/mp4" />
        </video>
        <Anchor className="scroll-to-btn" anchor={"#black"} />
      </div>

      <section className="black-bg title-section" id="black">
        <div className="container">
          <div className="row jc-center">
            <div className="col-auto">
              <div className="tt-uc fs-11 ls-5 title">
                video production studio
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="white-bg with-us-section" id="work">
        <div className="container">
          <div
            className="fs-26 ls-18 mb-25 ta-center"
            data-sal="fade"
            data-sal-delay="300"
            data-sal-duration="800"
          >
            {formatMessage({ id: "work" })}
          </div>
          <div
            className="fs-21 fw-normal ls-18 grey-color area-label ta-center"
            data-sal="fade"
            data-sal-delay="300"
            data-sal-duration="800"
          >
            {formatMessage({ id: "work.descr" })}
          </div>

          <Form onClick={sendMessage} />
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <img src={About} className="about-logo" alt="Maccarow" />

          <div className="about-text">
            <div className="about-title">about Us</div>
            <div className="about-big-title">MacArrow Studio</div>
            <div className="about-descr">
              We are a full-fledged video production studio. Our team consists
              of directors, videographers, stylists, editors, colorists, and
              other specialists. For us it is important to provide you with an
              excellent result within the range of any budget whether you need a
              video for your brand, blog, clip or otherwise. Please write to us,
              and we will contact you for a detailed discussion of your project.
              We are focusing on the latest trends in the video industry and on
              the very best production quality.
            </div>
          </div>
        </div>
      </section>

      <section className="white-bg video-section" id="video">
        <div className="container">
          <div
            className="fs-26 ls-18 mb-25 ta-center"
            data-sal="fade"
            data-sal-delay="300"
            data-sal-duration="800"
          >
            {formatMessage({ id: "video" })}
          </div>
          <div
            className="fs-21 fw-normal ls-18 grey-color mb-60 ta-center"
            data-sal="fade"
            data-sal-delay="300"
            data-sal-duration="800"
          >
            {formatMessage({ id: "video.descr" })}
          </div>

          <div
            className="gallery mb-80"
            data-sal="fade"
            data-sal-delay="300"
            data-sal-duration="800"
          >
            <div className="row">
              <div className="col-4 gallery-col">
                <div className="gallery-item">
                  <img src={GalleryImg} alt="Macarrow" />
                </div>
              </div>
              <div className="col-4 gallery-col">
                <div className="gallery-item">
                  <img src={GalleryImg} alt="Macarrow" />
                </div>
              </div>
              <div className="col-4 gallery-col">
                <div className="gallery-item">
                  <img src={GalleryImg} alt="Macarrow" />
                </div>
              </div>
            </div>
          </div>

          <div className="df jc-center">
            <button className="button mt-60">
              <Anchor
                className="anchor"
                anchor={"#work"}
                text={formatMessage({ id: "work" })}
              />
            </button>
          </div>
        </div>
      </section>

      <footer className="black-bg" id="contacts">
        <div className="container">
          <div className="empty-block"></div>

          <div>
            <div className="row">
              <div className="col-12">
                <div className="row ai-center jc-sb">
                  <div className="col-auto">
                    <a href="/" className="logo df ai-center">
                      <img src={FooterLogo} alt="Maccarow" width="41" />
                    </a>
                  </div>
                  <div className="col-auto">
                    <div className="row jc-sb ai-center">
                      <div className="col-auto">
                        <ul className="nav-list footer-nav df ai-center">
                          <li className="nav-item pointer">
                            <Anchor
                              className="anchor"
                              anchor={"#work"}
                              text={formatMessage({ id: "work" })}
                            />
                          </li>
                          <li className="nav-item pointer">
                            <Anchor
                              className="anchor"
                              anchor={"#video"}
                              text={formatMessage({ id: "video" })}
                            />
                          </li>
                          <li className="nav-item pointer">
                            <Anchor
                              className="anchor"
                              anchor={"#contacts"}
                              text={formatMessage({ id: "contacts" })}
                            />
                          </li>
                        </ul>
                      </div>

                      <div className="col-auto df ai-center social-container">
                        <Link
                          to="/insta"
                          className="social-link insta insta_lg"
                        >
                          <img src={Insta} alt="Maccarow" width="16" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sign tt-uc df ai-center jc-sb">
            <div>macarrow studio 2021</div>
            <Link to="/insta" className="social-link insta insta_sm">
              <img src={Insta} alt="Maccarow" width="16" />
            </Link>
          </div>
        </div>
      </footer>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <div className="fs-24">Your message has been sent</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Home
