import React, { useState, useEffect } from "react";
import { trainers } from "../utils/utils";
import { clients } from "../utils/utils";
import { Form, FormGroup, Button, Row, Col } from "react-bootstrap";
import ResultScreen from "./ResultScreen";

export const ConfigurationScreen = () => {
  const [trainersList, setTrainersList] = useState(trainers);
  const [clientsList, setClientsList] = useState(clients);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [satisfactionResults, setSatisfactionResults] = useState({});

  useEffect(() => {
    setTrainersList(trainers);
    setClientsList(clients);
  }, []);

  const hideModal = () => {
    setShowResultsModal(false);
    setTrainersList(trainers);
    setClientsList(clients);
  };

  const doAssingations = () => {
    clientsSorted = sortClientsByPreferenceValue(clientsList);
    trainersSorted = sortTrainersByValuation(trainersList);
    assignClients(trainersSorted, clientsSorted);
    setTrainersList(trainersSorted);
    setClientsList(clientsSorted);
    calculateSatisfaction(clientsList);
    setShowResultsModal(true);
  };

  const sortClientsByPreferenceValue = (clients) => {
    clientsSorted = [...clientsList];
    console.log("clientsSorted func :>> ", clientsSorted);
    clientsSorted.sort(function (a, b) {
      if (a.preference > b.preference) {
        return -1;
      }
      if (a.preference < b.preference) {
        return 1;
      }
      return 0;
    });
    return clientsSorted;
  };

  const sortTrainersByValuation = (trainers) => {
    trainersSorted = [...trainersList];
    trainersSorted.sort(function (a, b) {
      if (a.valuation > b.valuation) {
        return -1;
      }
      if (a.valuation < b.valuation) {
        return 1;
      }
      return 0;
    });
    return trainersSorted;
  };

  const assignClients = () => {
    clientsList.map((cl, i) => {
      trainer = trainersList.find((t) => t.slotsAvailable > 0);
      if (cl.preference > 5) {
        if (trainer.valuation > 2.5) {
          trainer.clients.push(cl);
          trainer.slotsAvailable--;
          cl.satisfied = true;
          cl.trainer = trainer.name;
        } else {
          trainer.clients.push(cl);
          trainer.slotsAvailable--;
          cl.satisfied = false;
          cl.trainer = trainer.name;
        }
      } else {
        trainer.clients.push(cl);
        trainer.slotsAvailable--;
        cl.satisfied = true;
        cl.trainer = trainer.name;
      }
    });
  };

  const calculateSatisfaction = (clients) => {
    total = clients.length;
    satisfied = clients.filter((c) => c.satisfied === true).length;
    notSatisfied = total - satisfied;
    res = {
      total: clients.length,
      satisfied: (satisfied / total) * 100,
      notSatisfied: (notSatisfied / total) * 100,
    };
    setSatisfactionResults(res);
    console.log("res :>> ", res);
    return;
  };

  return (
    <div className="container container-fluid main-container">
      <div className="conf-screen-title jumbotron">
        <h3>Pantalla configuración</h3>
      </div>
      <div className="">
        {trainers.length > 0 ? (
          <div>
            {trainers.map((tr, i) => (
              <div className="trainer-row" key={`${tr.name}-${i + 1}`}>
                <span className="ml-4 pl-2">{`Entrenador ${i + 1}`}</span>
                <hr />
                <div className="">
                  <>
                    <Form.Group
                      as={Row}
                      className="m-3"
                      controlId={`trainerName-${i}`}
                    >
                      <Col sm={1}>
                        <Form.Label>Nombre</Form.Label>
                      </Col>
                      <Col sm={2}>
                        <Form.Control
                          type="text"
                          name="name"
                          placeholder="Name..."
                        />
                      </Col>
                      <Col sm={1}>
                        <Form.Label>Valoración</Form.Label>
                      </Col>
                      <Col sm={2}>
                        <Form.Control
                          type="number"
                          name="reputation"
                          placeholder="Reputation..."
                        />
                      </Col>
                      <Col sm={2}>
                        <Form.Label>Máximo número de clientes</Form.Label>
                      </Col>
                      <Col sm={2}>
                        <Form.Control
                          type="number"
                          name="numberOfClients"
                          placeholder="Nº of clients..."
                        />
                      </Col>
                    </Form.Group>
                  </>
                </div>
              </div>
            ))}
            <div className="div-actions">
              <Button onClick={doAssingations}>Calcular resultados</Button>
            </div>
          </div>
        ) : (
          <div>
            <p>There are no trainers yet.</p>
          </div>
        )}
      </div>
      <ResultScreen
        show={showResultsModal}
        onHide={hideModal}
        trainersList={trainersList}
        clientsList={clientsList}
        satisfactionResults={satisfactionResults}
      />
    </div>
  );
};
