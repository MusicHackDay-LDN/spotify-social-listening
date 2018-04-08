import React from 'react'
import { Container, Heading } from 'rebass'
import styled from 'styled-components'
import { Flex } from 'grid-styled'

const StyledContainer = styled(Container).attrs({
  bg: 'white',
  py: 4
})`
  min-height: 400px;
  max-width: 90%;
  border-radius: 24px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Page = ({ title, children }) => (
  <StyledContainer>{children}</StyledContainer>
)

export default Page
