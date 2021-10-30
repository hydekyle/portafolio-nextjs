import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'
import magnificos_screen1 from '../public/images/works/magnificos1.jpg'
import magnificos_screen2 from '../public/images/works/magnificos2.jpg'
import GameDisplayer from '../components/game-displayer'
import Image from 'next/image'

const Works = () => (
  <Layout title="Portafolio">

    <Heading as="h2" fontSize={20} align="center" textColor="teal">
        Juegos Unity3D
    </Heading>
    <Heading as="h4" fontSize={15} align="center" mt={1} mb={2}>
        ¡Pincha en el icono del juego para probarlo!
    </Heading>
    <GameDisplayer></GameDisplayer>

    <Container>
    <Heading as="h3" fontSize={20} align="center" textColor="teal" mt={10} mb={6}>
        Aplicaciones Flutter
    </Heading>

    <Heading as="h3" fontSize={20} align="center" my={6}>
        5 MAGNIFICOS
    </Heading>
      
      <SimpleGrid columns={[1, 1, 2]} gap={6}>
        <Section>
          <WorkGridItem title="Pantalla principal" thumbnail={magnificos_screen1}>
            Aquí puedes modificar tu equipo y ver las estadísiticas de los jugadores del partido en la tabla.
          </WorkGridItem>
        </Section>
        <Section>
          <WorkGridItem title="Estadisticas" thumbnail={magnificos_screen2}>
            Puedes consultar las estadísiticas de un jugador concreto y observar su rendimiento.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Works
