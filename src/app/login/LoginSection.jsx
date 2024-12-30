'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import styles from './login-section.module.scss'
import Image from 'next/image'

const formSchema = z.object({
  username: z.string().min(3, '사용자 이름은 최소 3자 이상이어야 합니다'),
  password: z.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다')
})

const LoginSection = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(formSchema)
  })

  const onSubmitHandler = async (data) => {
    await onSubmit(data)
  }

  return (
    <div className={styles.containerLoginscreen}>
      <div className={styles.imageSimbolText}>
        <div className={styles.simbol}>
          <div className={styles.logo}>
            <Image
              src="/images/login/logo.png"
              alt="ci"
              width={80}
              height={80}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <div className={styles.shadow} />
        </div>
        <div className={styles.title}>유지관리의 쉬운 시작</div>
      </div>
      <div className={styles.formWrapper}>
        <form
          className={styles.containerTextTextfieldBtnText}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className={styles.loginTitle}>로그인</div>
          <div className={styles.containerTextfieldBtnText}>
            <div className={styles.inputContainer}>
              <label className={styles.label}>아이디</label>
              <input
                {...register('username')}
                className={styles.textfield}
                type="text"
                placeholder="아이디를 입력하세요"
              />
              {errors.username && (
                <p className={styles.errorText}>{errors.username.message?.toString()}</p>
              )}
            </div>
            <div className={styles.inputContainer}>
              <label className={styles.label}>비밀번호</label>
              <input
                {...register('password')}
                className={styles.textfield}
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
              {errors.password && (
                <p className={styles.errorText}>{errors.password.message?.toString()}</p>
              )}
            </div>
            <button type="submit" className={styles.loginButton}>
              로그인
            </button>
            <div className={styles.passwordOptions}>
              <div className={styles.forgotPasswordText}>비밀번호를 잊어버리셨나요?</div>
              <div className={styles.findPassword}>비밀번호 찾기</div>
            </div>
          </div>
        </form>
      </div>
      <div className={styles.footer}>© 2021. UNIONE I&C. All rights reserved.</div>
    </div>
  )
}

export default LoginSection
