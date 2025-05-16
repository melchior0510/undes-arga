-- File: Task2.hs
module Main where

-- | Compute factorial using recursion
factorial :: Integer -> Integer
factorial 0 = 1
factorial n
  | n > 0     = n * factorial (n - 1)
  | otherwise = error "factorial: negative input"

main :: IO ()
main = do
  putStrLn $ "Factorial of 0 is: " ++ show (factorial 0)
  putStrLn $ "Factorial of 5 is: " ++ show (factorial 5)
  putStrLn $ "Factorial of 10 is: " ++ show (factorial 10)
