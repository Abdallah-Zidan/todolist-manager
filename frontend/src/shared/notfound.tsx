import { Link } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

export default function Notfound() {
  return (
    <section style={{
      padding: '40px 0',
      fontFamily: 'Arvo, serif',
      width: '100vw',
      height: '100vh',
    }}>
      <Container
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div>
          <div>
            <div>
              <div style={{
                backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
                height: '75vh',
                backgroundPosition: 'center',
              }}>

              </div>
              <div>
                <h3 style={{ fontSize: '50px' }}>
                  Look like you're lost
                </h3>

                <Link to={'/'}>
                  <a className='link_404'>Go to Home</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

