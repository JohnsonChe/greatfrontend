import { useState, useMemo } from 'react'
import { info } from '../../types/ProductDetailsType'
import { RiAddCircleLine, RiIndeterminateCircleLine } from 'react-icons/ri'

interface AccordianProps {
  info: info[]
}

export default function Accordian({ info }: AccordianProps) {
  const accordionKeys = useMemo(
    () =>
      info.reduce((arg, { title }) => {
        arg[title] = false
        return arg
      }, {} as Record<string, boolean>),
    [info]
  )
  const [accordionState, setAccordianState] = useState(accordionKeys)

  return (
    <div className='w-full mt-10'>
      {info.map(({ title, description }, index) => (
        <div
          className='flex flex-col border-b border-b-neutral-200 py-6 cursor-pointer'
          key={title + description + index}
          onClick={() =>
            setAccordianState((prev) => {
              const newState = { ...prev }
              newState[title] = !prev[title]
              return newState
            })
          }>
          <div className='flex justify-between'>
            <span>{title}</span>
            {accordionState[title] ? (
              <RiIndeterminateCircleLine className='size-6 text-neutral-400 cursor-pointer' />
            ) : (
              <RiAddCircleLine className='size-6 text-neutral-400 cursor-pointer' />
            )}
          </div>
          {accordionState[title] && (
            <div className='mt-2 w-[263px] md:w-full text-neutral-600'>
              {description.map((bullet, index) => (
                <li key={bullet + index}>{bullet}</li>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
