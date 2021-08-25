
import{Container} from "semantic-ui-react";
import classNames from "classnames";
import Header from "../../components/Header";

export default function BasicLayout(props) {
    const { children, className } = props;
    // className="basic-layout"
    return (
        // a este classname usando classnames se le pasan todas las clases default
        // y luego las clases  condicionales
        <Container fluid       className={classNames("basic-layout", {
            [className]: className,
          })}
          >
           <Header />
           {/* este container tiene el contenido de la pagina */}
           <Container className="content">
           {children}
           </Container>
          
            {/* children es lo que se encuentra entre dos etiquetas  */}
          

        </Container>
    );


}