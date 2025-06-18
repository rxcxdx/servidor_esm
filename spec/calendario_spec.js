import yup from 'yup'
import dayjs from 'dayjs'

describe('calendario', () => {
  it('dia', () => {
    const joker = yup.date().validateSync('2025-03-01')
    const v = dayjs(joker).format('DD/MM/YYYY')
    expect(v).toBe('01/03/2025')
  })
})
