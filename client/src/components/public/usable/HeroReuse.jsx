import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { X } from 'lucide-react'
import Form from '../../../components/Form'
import { openProjectForm } from '../../../features/form/projectFormSlice'

export default function HeroReuse({
  eyebrow,
  h1_Start,
  h1_span,
  h1_end,
  par,
  first_btn,
  second_btn,
  more_one,
  more_two,
  link_1,
  link_2,
  page,
}) {
  const dispatch = useDispatch()

  return (
    <>
      <div className="hero-content" key={eyebrow}>
        <div className="eyebrow">
          <span className="eyebrow-dot"></span>
          {eyebrow}
        </div>

        <h1>
          {h1_Start}
          <br />
          <span>{h1_span}</span>
          <br />
          {h1_end}
        </h1>

        <p className="hero-description">{par}</p>

        <div className="hero-buttons">
          {link_1 === '/contact' ? (
            <button
              type="button"
              className="primary-button"
              onClick={() => dispatch(openProjectForm())}
            >
              {first_btn}
              <ArrowRight size={18} />
            </button>
          ) : (
            <Link to={link_1} className="primary-button">
              {first_btn}
              <ArrowRight size={18} />
            </Link>
          )}
          <Link to={link_2} className="secondary-button">
            {second_btn}
          </Link>
        </div>

        <div className="hero-trust">
          <span>{more_one}</span>

          <div className="trust-line"></div>

          <span>{more_two}</span>
        </div>
      </div>
    </>
  )
}
