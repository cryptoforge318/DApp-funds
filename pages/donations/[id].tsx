import Delete from '@/components/Delete'
import Details from '@/components/Details'
import Donors from '@/components/Donors'
import NavBtn from '@/components/NavBtn'
import Payment from '@/components/Payment'
import { globalActions } from '@/store/globalSlices'
import { generateCharities } from '@/utils/fakeData'
import { CharityStruct, RootState } from '@/utils/type.dt'
import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page: NextPage<{ charityData: CharityStruct }> = ({ charityData }) => {
  const { charity } = useSelector((states: RootState) => states.globalStates)
  const dispatch = useDispatch()
  const { setCharity } = globalActions

  useEffect(() => {
    dispatch(setCharity(charityData))
  }, [dispatch, setCharity, charityData])

  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>Charity | {charity?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-10"></div>
      <div className="h-10"></div>
      <div className="h-10"></div>
      {charity && (
        <div
          className="flex flex-col sm:flex-row sm:justify-between items-start
          lg:w-2/3 w-full mx-auto space-y-4 sm:space-y-0 sm:space-x-10 my-10 px-8 sm:px-0"
        >
          <Details charity={charity} />
          <Payment charity={charity} />
        </div>
      )}
      <Donors />
      <Delete />
      <NavBtn donationId={Number(id)} />
    </div>
  )
}

export default Page

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query

  const charityData: CharityStruct = generateCharities(Number(id))[0]
  return {
    props: { charityData: JSON.parse(JSON.stringify(charityData)) },
  }
}
