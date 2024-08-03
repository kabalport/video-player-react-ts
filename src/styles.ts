// styles.ts
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', Arial, sans-serif;
    background-color: ${props => props.theme.backgroundColor};
  }
`;

export const AppBar = styled.header`
  width: 100%;
  background-color: ${props => props.theme.appBarColor};
  padding: 10px 0;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

export const AppBarTitle = styled.h1`
  color: white;
  text-align: center;
  margin: 0;
  font-size: 1.5rem;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
  color: ${props => props.theme.color};
`;

export const PlayerWrapper = styled.div`
  width: 100%;
  max-width: 1280px;
  position: relative;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const PlayerControlsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PlayerControls = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`;

export const ControlButton = styled.button`
  background-color: ${props => props.theme.controlButtonColor};
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.controlButtonHoverColor};
  }
`;

export const Playlist = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 1280px;
`;

export const PlaylistItem = styled.li<{ isActive: boolean }>`
  padding: 10px;
  margin: 5px 0;
  background-color: ${props => (props.isActive ? '#1e88e5' : 'white')};
  color: ${props => (props.isActive ? 'white' : 'black')};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: ${props => (props.isActive ? '#1565c0' : '#e0e0e0')};
  }
`;

export const SearchBar = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

export const TimeDisplay = styled.div`
  font-size: 1rem;
  color: white;
  margin-bottom: 10px;
`;

export const FavoriteButton = styled.button<{ isFavorite: boolean }>`
  background-color: ${props => (props.isFavorite ? 'gold' : 'white')};
  color: ${props => (props.isFavorite ? 'black' : 'black')};
  border: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${props => (props.isFavorite ? '#ffd700' : '#e0e0e0')};
  }
`;

export const FavoriteList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 1280px;
  margin-top: 20px;
`;

export const FavoriteItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background-color: #ffeb3b;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #ffd700;
  }
`;
