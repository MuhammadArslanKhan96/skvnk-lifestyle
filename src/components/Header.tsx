import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Image from 'next/image'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

import styles from './styles.module.css'

export default function Header() {
    return (
        <Disclosure as="nav" className={styles.headerBg}>
            {({ open }) => (
                <>
                    <div className={styles.headerContainer}>
                        <div className={styles.headerInner}>
                            <div className={styles.headerLogoCont}>
                                <div className={styles.headerLogo}>
                                    <Image src="/skvnk_logo.png" width={200} height={30} alt={''} />
                                </div>
                            </div>

                            <div className={styles.headerAside}>
                                <a href=""
                                  
                                    className={styles.headerBtn}
                                >
                                    Join the club
                                </a>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </Disclosure>
    )
}
