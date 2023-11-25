import React from 'react'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import Header from '../Header/Header'
import Row from '../ProductRow/Row'


const Homepage = ({ user }) => {
    console.log(user);


    return (

        <>
            <Row />
            <div className='bg-dark-50 my-5 '>
                <p className='text-center'>Filpcart Clone @ Sumit</p>
            </div>
        </>
    )
}

export default Homepage