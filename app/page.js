import Header from '../components/Header'
import Welcome from '../components/Welcome'
import Church from '../components/Church'
import Confession from '../components/Confession'
import Loader from '../components/Loader'
import Final from '../components/Final'

export default function Home() {
  return (
    <>
      <Header />
      <Welcome />
      <Church />
      <Confession />
      {/* <Loader /> */}
      {/* <Final /> */}
    </>
  )
}
