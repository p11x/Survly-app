#!/bin/bash
check() {
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$1")
  echo "$STATUS $1"
}
check "https://images.unsplash.com/photo-1590439471364-192aa70c0b53"
check "https://images.unsplash.com/photo-1562886889-42b77c320d57"
