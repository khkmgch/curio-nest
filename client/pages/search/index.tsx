import { Button, List, TextInput } from '@mantine/core'
import { NextPage } from 'next'
import { FormEvent, RefObject, useEffect, useRef, useState } from 'react'
import { Layout } from '../../components/Layout'
import { SearchedBookItem } from '@/components/book/SearchedBookItem'
import { useGetBook } from '../../hooks/book/useGetBook'
import { SearchedBookData } from '@/types/book/searched-book-data.type'

const Search: NextPage = () => {
  //状態

  //検索キーワード
  const keywordRef = useRef<HTMLInputElement>(null)

  //検索結果
  const [searchedData, setSearchedData] = useState<SearchedBookData>({
    kind: '',
    totalItems: 0,
    items: [],
  })

  //メソッド

  //キーワードで本を検索するメソッド
  const { searchBooksByKeyword } = useGetBook()

  //検索結果を状態:searchedDataにセットするメソッド
  const fetchBooks = async (keyword: string) => {
    const response = await searchBooksByKeyword(keyword)
    if (response) {
      setSearchedData(response)
    }
  }
  //フォームのsubmitメソッド
  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    keywordRef: RefObject<HTMLInputElement>
  ) => {
    e.preventDefault()
    if (keywordRef.current !== null) {
      fetchBooks(keywordRef.current?.value)
    }
  }
  return (
    <Layout title="Search">
      <div>
        <h3>本の検索</h3>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e, keywordRef)}
        className="flex items-center justify-center"
      >
        <TextInput
          placeholder="キーワードを入力してください。"
          variant="filled"
          radius="lg"
          size="md"
          ref={keywordRef}
          className="mr-5 w-96"
        />
        <Button type="submit" variant="light" color="teal">
          探す
        </Button>
      </form>

      <List my="lg" spacing="sm" className="list-none ">
        {searchedData.items.map((item) => (
          <SearchedBookItem
            key={item.id.toString()}
            id={item.id}
            info={item.volumeInfo}
          />
        ))}
      </List>
    </Layout>
  )
}

export default Search