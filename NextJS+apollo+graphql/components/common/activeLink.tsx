import { useRouter } from 'next/router'
import Link from "next/link";
import classnames from 'classnames'

interface Props {
    children: string;
    href: string;
    className: string;
}

export default function ActiveLink({ children, href, className }: Props) {
    const router = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        router.push(href).then(() => window.scrollTo(0, 0));
    }

    return (
        <Link href={href}>
            <a
                href={href}
                onClick={handleClick}
                className={classnames(
                    className,
                    router.pathname === href ? 'activeLink' : null
                )}
            >
                {children}
            </a>
        </Link>
    )
}
