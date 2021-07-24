import React, { useState, useEffect } from "react";
import trainers from "../utils/utils";
import { Pie } from "react-chartjs-2";
import {
  Form,
  FormGroup,
  Button,
  Row,
  Col,
  Modal,
  Card,
  Tab,
  Tabs,
} from "react-bootstrap";

const ResultScreen = (props) => {
  const [activeTab, setActiveTab] = useState("results");
  const chartData = {
    labels: ["satisfied", "not satisfied"],
    datasets: [
      {
        label: "Client satisfaction",
        data: [
          props.satisfactionResults.satisfied,
          props.satisfactionResults.notSatisfied,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="result-title">
        {console.log(
          "props.satisfactionResults :>> ",
          props.satisfactionResults
        )}
        <Modal show={props.show} onHide={props.onHide} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>Pantalla de resultados</h3>
            </Modal.Title>
          </Modal.Header>
          <Tabs
            defaultActiveKey="results"
            className="mb-3"
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
          >
            <Tab eventKey="results" title="Resultados">
              {props.trainersList.length > 0 ? (
                <div className="cards-container">
                  {props.trainersList.map((t, i) => (
                    <div key={`${t.name}-${i + 1}`}>
                      <Modal.Body className="overflow-auto">
                        <div className="modal-body">
                          <Card style={{ width: "16rem" }} className="card">
                            <Card.Header>
                              <h6>{`Entrenador ${i + 1}`}</h6>
                            </Card.Header>
                            <Card.Body className="card-body">
                              <Card.Title>
                                <div className="card-title m-2">
                                  <h6 className="font-weight-bold">{`Name: ${t.name} - Valuation: ${t.valuation}`}</h6>
                                </div>
                              </Card.Title>
                              <div className="card-body-clients">
                                <span>Clientes asignados:</span>
                                <div className="client-list">
                                  <ul>
                                    {t?.clients.map((cl, j) => (
                                      <li
                                        key={`${cl.name}-${j}`}
                                      >{`${cl.name} - ${cl.preference}`}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              
                            </Card.Body>
                            <Card.Footer className="text-muted">
                              <span>{`${t.clients.length} clientes asignados`}</span>
                            </Card.Footer>
                          </Card>
                        </div>
                      </Modal.Body>
                    </div>
                  ))}
                </div>
              ) : (
                <div>No se pudieron calcular los resultados correctamente.</div>
              )}
            </Tab>
            <Tab eventKey="satisfactionResults" title="Valoración del conjunto">
              <div className="div-tab-graphics">
                <div className="div-chart">
                  <Pie data={chartData} height={400} width={400} />
                </div>
              </div>
            </Tab>
          </Tabs>
        </Modal>
      </div>
    </div>
  );
};

export default ResultScreen;
