import './A11HomeIcons.css'
import { StarIcon } from '@chakra-ui/icons'
import {FaPlaneDeparture,FaUserAlt,FaHiking} from 'react-icons/fa'

export const User = () =>{
return (
    <FaUserAlt className='icon' color='unset'></FaUserAlt>
)
}

export const Plane = () =>{
return (
    <FaPlaneDeparture className='icon' color='red'> </FaPlaneDeparture>
)
}


export const Walker = () =>{
return (
    <FaHiking className='icon' color='green'></FaHiking>
)
}

export const Star = () =>{
return (
    <StarIcon className='icon' color='yellow'/>
)
}