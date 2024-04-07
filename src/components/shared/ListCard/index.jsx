/* eslint-disable react/prop-types */
import React from 'react'
import fallbackImg from "../../../assets/images/fallbackImage.jpg"
import { Link } from 'react-router-dom'
import "./_index.scss"
import dayjs from 'dayjs'

const ListCard = ({ item, tag, className, mainCard, getDaysAgo, recent, showPastDay }) => {

    return (
        <Link to={`/article/${item?.title}`} state={{ item: item }} className={`list-card  gap-2 p-2 ${className}`}>
            {/* Start Image */}
            <div className='list-card_img'>
                <img className='w-100 h-100 object-fit-cover' src={item?.urlToImage ?? fallbackImg} alt={item?.title} />
            </div>
            {/* End Image */}

            {/* Start Text */}
            <div className='list-card_text'>
                {tag && <p className='my-1 fs-14 text__muted text-uppercase'> {tag} </p>}

                {mainCard ?
                    <p className='my-1 fs-32 fw-bold list-card_text_title'> {item?.title} </p>
                    : <p className='my-1 list-card_text_title'> {item?.title} </p>}

                {mainCard && <p className='my-1 fs-16 text__gray list-card_text_desc'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>}


                {recent ?
                    <p className="text__muted"> {dayjs(item?.publishedAt).format("h:mm a MMM DD")} </p>
                    : <p className='my-1'> By: <span className='text__primary fst-italic'>  {item?.author}
                        {showPastDay && <span className="text__muted">|  {getDaysAgo(item?.publishedAt)} Days Ago</span>}

                    </span></p>}
            </div>
            {/* End Text */}

        </Link>
    )
}

export default ListCard