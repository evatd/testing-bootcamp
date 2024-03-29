import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const AvatarWrapper = styled.img`
  margin-right: 0.5em;

  ${props => props.size === 'small' && css`
    clip-path: circle(10px at center);
    width:20px;
  `}
  
  ${props => props.size === 'medium' && css`
    clip-path: circle(15px at center);
    width:30px;
    height: 30px;
  `}
  
  ${props => props.size === 'large' && css`
    clip-path: circle(25px at center);
    width: 50px;
  `}
`

const Avatar = ({ username, size = "medium" }) => (
  <AvatarWrapper
    size={size}
    src={`/images/${username}_lg.jpg`}
    alt={`${username}`}
  />
)

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  size: PropTypes.string,
}

// can change it so you get this name in your serialised output
// in the _snapshot_ output ( not getting it in this dir for some reason)
// instead of styled.img
// Avatar.displayName = 'Avatar' 

export default Avatar
