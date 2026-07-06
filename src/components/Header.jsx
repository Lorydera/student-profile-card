// Styling method: Styled-Components + ThemeProvider
import styled, { ThemeProvider } from "styled-components";
import theme from "../styles/theme";

const Wrapper = styled.header`
  background: ${(p) => p.theme.colors.primary};
  color: #fff;
  padding: 1.5rem 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

const Stats = styled.p`
  font-size: 0.9rem;
  opacity: 0.75;
`;

const Header = ({ title, studentCount, averageScore }) => (
  <ThemeProvider theme={theme}>
    <Wrapper>
      <Title>{title}</Title>
      <Stats>{`${studentCount} Students Enrolled | Class Average: ${averageScore.toFixed(1)}%`}</Stats>
    </Wrapper>
  </ThemeProvider>
);

export default Header;
