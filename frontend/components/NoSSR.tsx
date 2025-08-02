/**
 * NoSSR 组件
 *
 * 📌 用途：
 * - 禁用服务端渲染（SSR），确保组件内容仅在客户端渲染
 * - 适用于依赖浏览器 API（如 window、localStorage）或客户端状态的组件
 *
 * 🧠 设计思路：
 * - React 的 SSR 会在服务端预渲染组件并将 HTML 发送给客户端，随后客户端进行 hydration（绑定事件等）
 * - 如果组件在服务端执行时访问了浏览器 API 或生成了不稳定的内容（如 Math.random），就会导致 hydration mismatch 错误
 * - 为了避免这种情况，我们通过 `useEffect` 设置一个 `mounted` 状态，确保组件内容只在客户端挂载后才渲染
 * - `useEffect` 是 React 的副作用钩子，只在客户端执行，因此 `mounted` 初始为 `false`，服务端渲染时返回 `null`
 * - 客户端挂载后 `mounted` 变为 `true`，组件才真正渲染其子内容，从而实现“跳过 SSR”的效果
 *
 * ✅ 效果：
 * - 服务端渲染时组件返回 `null`，不会输出任何 HTML
 * - 客户端 hydration 完成后再渲染真实内容，避免 SSR mismatch
 * - 保证组件行为与浏览器环境一致，适合动态渲染或依赖客户端状态的场景
 */

'use client' // 标记为客户端组件，仅在客户端渲染
import React, { useEffect, useState } from 'react'


/**
 * 非服务端渲染组件
 * @param children - 需要延迟渲染的子组件
 * @returns 当组件挂载后渲染子组件，否则返回 null
 */
export default function NoSSR({children}: { children: React.ReactNode }) {
  // 状态标记组件是否已挂载
  const [mounted, setMounted] = useState(false)

  // 组件挂载后设置 mounted 为 true
  useEffect(() => setMounted(true), [])

  // 仅在挂载后渲染子组件
  return mounted ? <>{children}</> : null
}