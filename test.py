def check_sum(arr):
  if type(arr) is list:
    print(arr)

    for i in arr:
      newArr=arr.copy()
      newArr.remove(i)

      for j in newArr:
        if i + j == 0:
          return True
    return False
  else:
    return False

array1 = [10, -14, 26, 5, -3, 13, -5]
array2 = [10, -14, 26, 5, -3]

print(check_sum(array2))