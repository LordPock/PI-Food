import { useNavigate } from "react-router-dom";
import styles from "./about.module.css";

export default function About() {

const navigate = useNavigate()    


  return (
    <div className={styles.about}>
     <button className={styles.button} onClick={() => navigate('/recipes')} />
      <div className={styles.about2}>
      
        <h2 className={styles.h2}>PI Food</h2>
        <hr />
        <p className={styles.span}>
          Hola, mi nombre es Claudio, este Proyecto Individual fue realizada
          como parte del LABS de{" "}
          <a
            className={styles.link}
            href="https://www.soyhenry.com/"
            target="_blank"
          >
            HENRY
          </a>
          .
        </p>

        <p className={styles.span}>
          Para el desarrollo utilice Javascript, React, React-Router-dom, Redux,
          Express, Jest, SQL, Sequelize, Node.js, PostgreSQL y mucho amor ♥
        </p>

        <p className={styles.span}>
          Fue una actividad interesante, divertida, de a momentos frustrante,
          pero sobre todo enriquecedora. Ayudo a fijar los conocimientos
          teóricos y prácticos aprendidos en clase, a afianzar los lazos con los
          compañeros y TAs que siempre estuvieron dispuestos a dar una mano y
          sobre todo a ganar confianza en uno mismo y en sus pares a la hora de
          programar.
        </p>

        <p className={styles.span}>De Henry, al mundo, aquí llegué.</p>

        <h3>
          <a
            className={styles.firma}
            href="https://www.linkedin.com/in/claudio-di-toro-13a158251/"
            target="_blank"
          >
            Claudio
          </a>
        </h3>
      </div>
    </div>
  );
}
