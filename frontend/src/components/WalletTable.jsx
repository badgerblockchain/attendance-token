import { Container, Row, Col, Table } from "react-bootstrap";

import AddressResolver from "./AddressResolver";
import DateResolver from "./DateResolver";
import { gql, useQuery } from "@apollo/client";

function WalletTable() {
  // Define our query
  const top10HoldersQuery = gql`
    query getTop10Holders(
      $first: Int!
      $orderBy: String!
      $orderDirection: String!
      $timestamp: String!
      $asc: String!
    ) {
      holders(
        first: $first
        orderBy: $orderBy
        orderDirection: $orderDirection
      ) {
        id
        balance
        receives(orderBy: $timestamp, orderDirection: $asc) {
          id
          timestamp
        }
      }
    }
  `;

  // execute our query
  const { loading, error, data } = useQuery(top10HoldersQuery, {
    variables: {
      first: 10,
      orderBy: "balance",
      orderDirection: "desc",
      timestamp: "timestamp",
      asc: "asc",
    },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <Container className="d-flex justify-content-center">
      <Row>
        <Col className="d-flex justify-content-center" xs={12}>
          <h3> dashboard </h3>
        </Col>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Wallet's</th>
                <th>Number of Tokens</th>
                <th>Date of First Token</th>
              </tr>
            </thead>
            <tbody>
              {data.holders.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <AddressResolver id={item.id} />
                  </td>
                  <td>{item.balance}</td>
                  <td>
                    <DateResolver randomDate={item.receives[0].timestamp} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default WalletTable;
