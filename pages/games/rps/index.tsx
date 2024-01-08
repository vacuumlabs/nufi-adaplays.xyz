import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Flex, Button, Heading } from '@chakra-ui/react';
import { navHeight } from 'constants/global'
import NextLink from 'next/link'
import { brandButtonStyle } from 'theme/simple'
import ValidateGate from 'components/validate-gate'
import { getApi } from 'utils/lucid/lucid';

const commonButtonProps = {...brandButtonStyle, mt:'10px', w:'350px', mb:'10px', h:'50px' }


const OptionButton = ({ message, href }: { message: string, href: string }) => {
  return (
    <NextLink href={href} passHref>
      <Button as="a" {...commonButtonProps}>
        {message}
      </Button>
    </NextLink>
  )
}

const Home: NextPage = () => {
  const router = useRouter()
  const query = router.query;
  return (
    <ValidateGate>
      <Flex direction='column' justify='center' h={`calc(100vh - ${navHeight})`} align='center'>
        {query?.completed === "true" && <Heading variant='brand' mb='20px'>Game is completed</Heading>}
        <OptionButton message={"Create a new game"} href="/games/rps/new-game" />
        <OptionButton message="Join an active game involving you" href='/games/rps/active-games' />
        <Button {...commonButtonProps} onClick={async () => {
            // Note: update to `nufiSnap` when testing snap
            const api = await getApi('nufiSSO')
            await api.getCollateral()
          }}>
          Create collateral
        </Button>
        <Button {...commonButtonProps}  onClick={async () => {
           // Note: update to `nufiSnap` when testing snap
          const api = await getApi('nufiSSO')
          // this provides encoded address of selected account.
          // There is probably better way to access the address.
          // This is solely for convenience.
          const address = (await api.getChangeAddress())
          const signedMessage = await api.signData(address, Buffer.from('payload').toString(
            'hex',
          ))
          console.log('signedMessage output: ', signedMessage)
        }}>
          Sign Message
        </Button>
      </Flex>
    </ValidateGate>
  )
}

export default Home
