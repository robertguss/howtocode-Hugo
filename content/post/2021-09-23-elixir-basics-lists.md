+++
title = "Elixir Basics - Lists"
date = "2021-09-23"
slug = "elixir-basics-lists"
description = "In this article, we are going to learn how lists work in Elixir."
hero = "/images/elixir-basics/cover-purple.png"
tags = ["elixir"]
+++

Lists in Elixir are collections of values and can include multiple types.

```elixir
iex(1)> [5.0, "Hello, World", :false]
[5.0, "Hello, World", false]
```

## Lists are NOT arrays

It may be tempting to think that lists in Elixir are similar to arrays in other languages, but they are **nothing like arrays**. Lists in Elixir are implemented as "linked lists" because they are linked data structures. What exactly does this mean?

Typically with arrays you can access elements within that array via its index. Let's see what happens when we try this with a list in Elxir.

```elixir
iex(3)> list = [5.0, "Hello, World", :false]
[5.0, "Hello, World", false]
iex(4)> list[1]
** (ArgumentError) the Access calls for keywords expect the key to be an atom, got: 1
    (elixir 1.12.3) lib/access.ex:310: Access.get/3
```

The reason this does not work is because of the underlying "link" or connection/relationshop each element within the list has to one another. In a list, each element contains a pointer to the next element in the list. Elements within Lists are not typically stored right next to each other in memory, like they are in arrays. This has some performance implications.

If we want to determine the length of a list, we have to traverse through each and every element to find out how many there are in the list, because they are linked together. After the first element in list, we need to see where its pointer is pointing to, then find that elements pointer to the next element and so on. This means the longer the list is, the more expensive the operation is to calculate its length.

Compare this with arrays.

When asking for the length of an array, it simply tells you its length as the length of an array is a known attribute, which means no calculation is necessary.

## Head & Tail

Lists in Elixir have both a `head` and `tail`. The head is the first element within the list and the tail is all of the remaining elements within the list.

We can use the `hd()` function to grab the head of a list.

```elixir
iex(5)> hd([5.0, "Hello, World", :false])
5.0
```

Remeber, parantheses are optional in Elixir, so you can also do this.

```elixir
iex(6)> hd [5.0, "Hello, World", :false]
5.0
```

Similarly, we can get the tail of the list using the `tl()` function.

```elixir
iex(7)> tl [5.0, "Hello, World", :false]
["Hello, World", false]
```

Ok, so why is this important? Understanding the head & tail of lists is helpful for when you need to add or remove elements from a list as some of these operations are more expensive than others. To be clear, when I say more expensive, I mean it will require more computer resources and time to perform the operation.

## Prepend vs Append

Often times you will need to add a new element to an already existing list. Prepending the element onto a list, meaning the element is added to the beginning of the list is a cheap operation. The reason why it is cheap, is because all that is required is knowing where the first element of the list is and adding a new element in front of it.

This is not the case then appending to a list. When you need to add an element as the last element of a list, the entire list has to be traversed to find the last element first and then the new element can be appended onto the end. Since all of the elements in a list are linked together this is the only way to find out where the last element is.

### Prepend

You can prepend a new element onto a list like so:

```elixir
iex(9)> list = [5.0, "Hello, World", :false]
[5.0, "Hello, World", false]
iex(10)> [14 | list]
[14, 5.0, "Hello, World", false]
```

The way this works, is that we are creating a new list using brackets `[]` and placing new element `14` folowed by a pipe `|` and then the list we want to append onto `list`.

`[14 | list]` basically says create a new list where `14` is the first element and the remaning elements are whatever is stored inside of the `list` variable.

Remember, that data structures in Elixir are immutable so this operation has not changed our `list` variable. Rather what is returned is an entirely new list, the original `list` variable has not been modified.

```elixir
iex(9)> list = [5.0, "Hello, World", :false]
[5.0, "Hello, World", false]
iex(10)> [14 | list]
[14, 5.0, "Hello, World", false]
iex(11)> list
[5.0, "Hello, World", false]
```

### Append
