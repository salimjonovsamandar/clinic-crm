import styled from "styled-components";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const StyledStat = styled.div`
  /* Box */
  width: 230px;
  /* max-width: 1200px; */
  height: 162px;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6rem;
  height: 6rem;
  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3rem;
    height: 3rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.6rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);
`;

const Value = styled.p`
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 500;
  padding-top: 0.4rem;
`;

const StatisTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-green-700);
  }
`;

function Stat({ icon, title, value, color, trendIcon }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <div>
        <Title>{title}</Title>
        {trendIcon ? (
          <StatisTrend>
            <FaArrowTrendUp />
            <Value>{value}</Value>
          </StatisTrend>
        ) : (
          <Value>{value}</Value>
        )}
      </div>
    </StyledStat>
  );
}

export default Stat;
