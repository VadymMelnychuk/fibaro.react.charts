import { RingLoader } from "react-spinners";

const override = `
  display: block;
  margin: 50px auto;
  height: 300px;
`;

export default props => {
    return (<RingLoader css={override} color={'#8884d8'} size={300} />)
}