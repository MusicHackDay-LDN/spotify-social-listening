import styled from 'styled-components'

export const PlayerContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Artwork = styled.img`
  max-width: 400px;
  border-radius: 6px;
  box-shadow: 0px 3px 12px rgb(184, 184, 184);
  margin-bottom: 16px;
`

export const Title = styled.span`
  margin: 0;
  margin-bottom: 16px;
  text-align: center;
`

export const Controls = styled.div`
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  > * {
    margin: 0 1rem;
    cursor: pointer;
  }
`
export const ProgressBar = styled.div`
  position: relative;
  width: 75%;
  height: 10px;
  border-radius: 4px;
  overflow: hidden;
  background: gainsboro;
`

export const Progress = styled.div`
  position: absolute;
  border-radius: 4px;
  height: 100%;
  left: 0;
  top: 0;
  background: #ff8d6f;
`

export const ArtworkContainer = styled.div`
  position: relative;
`
export const Upvotes = styled.div`
  position: absolute;
  bottom: 5%;
  left: 0;
  width: 50%;
  display: flex;
  flex-direction: column;
  font-size: 48px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`

export const Downvotes = styled(Upvotes)`
  right: 5%;
  left: auto;
`
