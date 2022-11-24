import Link from 'next/link'
import { useForm } from 'react-hook-form'
import Layout from '../components/Layout'
import { signIn, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { getError } from '../utils/error'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function LoginScreen() {
  const { data: session } = useSession()
  const router = useRouter()
  const { redirect } = router.query //카트에 지불 버튼 -> 로그인 확인 -> 로그인 후 카트로

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/')
    }
  }, [router, session, redirect])

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  //비동기 형식이기 때문에 acync(대기)와 await(로그인준비)가 쌍으로
  const submitHandler = async ({ email, password }) => {
    console.log(email, password)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const githubLoginHandler = async () => {
    try {
      const result = await signIn('github', {
        redirect: false,
      })
      if (result.error) {
        toast.error(result.error)
      }
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const googleLoginHandler = async () => {
    try {
      await signIn('google', {
        redirect: false,
      })
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const kakaoLoginHandler = async () => {
    try {
      await signIn('kakao', {
        redirect: false,
      })
    } catch (err) {
      toast.error(getError(err))
    }
  }

  const naverLoginHandler = async () => {
    try {
      await signIn('naver', {
        redirect: false,
      })
    } catch (err) {
      toast.error(getError(err))
    }
  }

  return (
    <Layout title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="text-xl md-4 p-4 m-4">Login</h1>
        <div className="md-4">
          <label htmlFor="email" className="md-4 mt-4">
            Email
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
        </div>
        <div className="md-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'please enter password',
              minLength: {
                value: 3,
                message: '패스워드가 너무 짧음, 3자 이상',
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red">{errors.password.message}</div>
          )}
        </div>
        <div className="md-4">
          <button className="primary-button" type="submit">
            Login
          </button>
        </div>
        <div className="md-4">
          계정이 없으면 등록하세요... &nbsp;
          <Link href="register">
            <a>Register</a>
          </Link>
        </div>
        <div className="p5 rounded-lg">
          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={githubLoginHandler}
            >
              Githib Login
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={googleLoginHandler}
            >
              Google Login
            </button>
          </div>

          <div className="mb-4">
            <button
              className="primary-button w-full"
              type="button"
              onClick={kakaoLoginHandler}
            >
              Kakao Login
            </button>
          </div>

          <div className="">
            <button
              className="primary-button w-full"
              type="button"
              onClick={naverLoginHandler}
            >
              Naver Login
            </button>
          </div>
        </div>
      </form>
    </Layout> //form 입력창, 버튼 작동을 위해
  )
}
