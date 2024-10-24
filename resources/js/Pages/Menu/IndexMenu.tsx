'use client'

import { useState } from 'react'
import { Plus, ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card'

interface MenuItem {
  id: string
  name: string
  parentId: string | null
  idRole: string[]
  children: MenuItem[]
}

export default function IndexMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemParent, setNewItemParent] = useState<string | null>(null)
  const [newItemRole, setNewItemRole] = useState<string[]>([])

  const addMenuItem = () => {
    if (newItemName.trim() === '') return

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name: newItemName,
      parentId: newItemParent,
      idRole: newItemRole,
      children: [],
    }

    setMenuItems(prevItems => {
      if (newItemParent === null) {
        return [...prevItems, newItem]
      } else {
        return prevItems.map(item => {
          if (item.id === newItemParent) {
            return { ...item, children: [...item.children, newItem] }
          }
          return item
        })
      }
    })

    setNewItemName('')
    setNewItemParent(null)
    setNewItemRole([])
  }

  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return items.map(item => (
      <div key={item.id} style={{ marginLeft: `${level * 20}px` }}>
        <div className="flex items-center gap-2 my-1">
          {item.children.length > 0 ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <span>{item.name}</span>
          <span className="text-sm text-muted-foreground">({item.idRole.join(', ')})</span>
        </div>
        {renderMenuItems(item.children, level + 1)}
      </div>
    ))
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Tambah Menu Baru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nama Menu
              </Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent" className="text-right">
                Parent Menu
              </Label>
              <Select onValueChange={(value) => setNewItemParent(value)} value={newItemParent || undefined}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih parent menu (opsional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tidak ada parent</SelectItem>
                  {menuItems.map(item => (
                    <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                ID Role
              </Label>
              <Input
                id="role"
                placeholder="Masukkan ID role (pisahkan dengan koma)"
                value={newItemRole.join(', ')}
                onChange={(e) => setNewItemRole(e.target.value.split(',').map(role => role.trim()))}
                className="col-span-3"
              />
            </div>
            <Button onClick={addMenuItem} className="ml-auto">
              <Plus className="mr-2 h-4 w-4" /> Tambah Menu
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Struktur Menu</CardTitle>
          </CardHeader>
          <CardContent>
            {renderMenuItems(menuItems)}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preview Sidebar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded p-4">
              {renderMenuItems(menuItems)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}