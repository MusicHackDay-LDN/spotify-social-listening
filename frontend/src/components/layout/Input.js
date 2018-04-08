import { Input } from 'rebass'
import styled from 'styled-components'

const StyledInput = styled(Input).attrs({
  bg: 'gray1',
  p: 3
})`
  box-shadow: none !important;
  ::placeholder {
    color: ${p => p.theme.colors['gray4']};
  }
`

export default StyledInput
