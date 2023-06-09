import { FC } from 'react'
import { Menu } from '@mantine/core'
import { Book_WithRelation } from '@/types/prisma-extended/book-with-relation.type'
import { IconArrowNarrowLeft, IconExternalLink, IconTrash } from '@tabler/icons'
import { useMutateBook } from '@/hooks/book/useMutateBook'

type Props = Omit<Book_WithRelation, 'updatedAt'> & {
  isMine: boolean
  isShelf: boolean
  isLinked: boolean
  linkToQuestion?: (bookId: number) => void
  unLinkToQuestion?: (bookId: number) => void
}
export const BookItem: FC<Props> = ({
  id,
  createdAt,
  googleBooksId,
  isbn,
  title,
  authors,
  publisher,
  publishedDate,
  pageCount,
  imgLink,
  previewLink,
  links,
  userId,
  isMine,
  isShelf,
  isLinked,
  linkToQuestion,
  unLinkToQuestion,
}) => {
  //本を本棚から削除するメソッド
  const { deleteBookMutation } = useMutateBook()

  //Questionと本を紐づけするメソッド
  const createLinkToQuestion = () => {
    if (linkToQuestion) {
      linkToQuestion(id)
    }
  }
  //Questionと本の紐づけを削除するメソッド
  const deleteLinkToQuestion = () => {
    if (unLinkToQuestion) {
      unLinkToQuestion(id)
    }
  }
  //本を本棚から削除するメソッド
  const deleteBookFromShelf = () => {
    deleteBookMutation.mutate(id)
  }

  //Questionの編集画面で、Questionと紐づけされた本を縦のリスト表示する場合
  if (isLinked)
    return (
      <Menu shadow="md" position="bottom" offset={-40} withArrow>
        <Menu.Target>
          <div className="my-3 cursor-pointer p-1 drop-shadow-md hover:contrast-200 hover:drop-shadow-2xl">
            <div className="flex h-full items-center justify-center">
              {imgLink === '' ? (
                <div className="border-2 border-dotted border-gray-400 bg-slate-100">
                  {title}
                </div>
              ) : (
                <img src={imgLink || ''} alt="" className="object-cover" />
              )}
            </div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
          color='grayish-brown'
            icon={<IconExternalLink size={14} />}
            component="a"
            href={previewLink || ''}
            target="_blank"
          >
            詳しく見る
          </Menu.Item>
          <Menu.Divider />

          <Menu.Item
            color='deep-red'
            icon={<IconTrash size={14} />}
            onClick={() => deleteLinkToQuestion()}
          >
            削除
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  //Questionの編集画面に、My本棚の本を縦にリスト表示する場合
  else if (isMine && !isShelf)
    return (
      <Menu shadow="md" position="bottom" offset={-40} withArrow>
        <Menu.Target>
          <div className="my-3 cursor-pointer p-1 drop-shadow-md hover:contrast-200 hover:drop-shadow-2xl">
            <div className="flex h-full items-center justify-center">
              {imgLink === '' ? (
                <div className="border-2 border-dotted border-gray-400 bg-slate-100">
                  {title}
                </div>
              ) : (
                <img src={imgLink || ''} alt="" className="object-cover" />
              )}
            </div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
          color='dark-cyan'
            icon={<IconArrowNarrowLeft size={14} />}
            onClick={() => createLinkToQuestion()}
          >
            追加
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  //自分のプロフィールの本棚閲覧画面の場合
  else if (isMine)
    return (
      <Menu shadow="md" position="bottom" offset={-40} withArrow>
        <Menu.Target>
          <div className="my-3 cursor-pointer p-1 drop-shadow-md hover:contrast-200 hover:drop-shadow-2xl">
            <div className="flex h-full items-center justify-center">
              {imgLink === '' ? (
                <div className="border-2 border-dotted border-gray-400 bg-slate-100">
                  {title}
                </div>
              ) : (
                <img
                  src={imgLink || ''}
                  alt={title || 'No Image'}
                  className="object-cover"
                />
              )}
            </div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
          color='grayish-brown'
            icon={<IconExternalLink size={14} />}
            component="a"
            href={previewLink || ''}
            target="_blank"
          >
            詳しく見る
          </Menu.Item>
          <Menu.Divider />

          <Menu.Item
            color="deep-red"
            icon={<IconTrash size={14} />}
            onClick={() => deleteBookFromShelf()}
          >
            削除
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
  //他の人のプロフィールの本棚閲覧画面の場合
  else
    return (
      <Menu shadow="md" position="bottom" offset={-40} withArrow>
        <Menu.Target>
          <div className="my-3 cursor-pointer p-1 drop-shadow-md hover:contrast-200 hover:drop-shadow-2xl">
            <div className="flex h-full items-center justify-center">
              {imgLink === '' ? (
                <div className="border-2 border-dotted border-gray-400 bg-slate-100">
                  {title}
                </div>
              ) : (
                <img src={imgLink || ''} alt="" className="object-cover" />
              )}
            </div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
          color='grayish-brown'
            icon={<IconExternalLink size={14} />}
            component="a"
            href={previewLink || ''}
            target="_blank"
          >
            詳しく見る
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    )
}