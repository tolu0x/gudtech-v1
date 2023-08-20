import { FC } from 'react';
import {ConnectButton} from '@rainbow-me/rainbowkit';

interface HeaderProps {
  
}

const Header: FC<HeaderProps> = ({}) => {
  return (
      <header className="flex justify-between rounded-3xl pt-7 h-14 overflow-hidden fixed min-w-[92%] h-16 px-[6vw] py-2 menu left-4 right-4 z-50 lg:mx-8 lg:flex-row">
        <h1 className="font-bold text-3xl">Gudtech</h1>
          <ConnectButton/>
    </header>
  )
}

export default Header