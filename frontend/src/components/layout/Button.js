import styled from 'styled-components'
import { Button as RebassButton, ButtonCircle } from 'rebass'

// prettier-ignore
export const GradientButton = styled(ButtonCircle)`
  background: ${p => p.theme.colors[p.from]};
  background: -webkit-linear-gradient(to right, ${p => p.theme.colors[p.from]}, ${p => p.theme.colors[p.to]});
  background: linear-gradient(to right, ${p => p.theme.colors[p.from]}, ${p => p.theme.colors[p.to]});
`

// prettier-ignore
export const Button = styled(RebassButton).attrs({ bg: '#ff8d6f', px: 4, py: 3 })`
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
`
