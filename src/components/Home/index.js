import Header from '../Header'
import Footer from '../Footer'

const Home = () => {
  const tabActive = 'home-active'
  return (
    <>
      <Header tabActive={tabActive} />
      <div>Home</div>
      <Footer />
    </>
  )
}

export default Home
