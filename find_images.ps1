function Download-UnsplashImage($query, $destName) {
    Write-Host "Searching Unsplash for '$query'..."
    $url = "https://unsplash.com/s/photos/" + [Uri]::EscapeDataString($query)
    
    try {
        $webClient = New-Object System.Net.WebClient
        # Add User-Agent to avoid blocks
        $webClient.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)")
        $html = $webClient.DownloadString($url)
        
        # Extract photo URLs
        $matches = [regex]::Matches($html, 'https://images.unsplash.com/photo-[a-zA-Z0-9\-]+')
        $urls = @()
        foreach ($m in $matches) {
            $urls += $m.Value
        }
        $uniqueUrls = $urls | Select-Object -Unique
        
        if ($uniqueUrls.Count -gt 0) {
            # Pick a suitable image. The first few are usually the most relevant.
            # Let's try the first one, or the second one.
            $imgUrl = $uniqueUrls[0] + "?w=800&auto=format&fit=crop&q=80"
            $dest = "c:\Users\user\Desktop\SEO\web\assets\products\" + $destName
            Write-Host "Found image! Downloading $imgUrl to $dest..."
            $webClient.DownloadFile($imgUrl, $dest)
            Write-Host "Success!"
            return $true
        } else {
            Write-Host "No images found for '$query'."
            return $false
        }
    } catch {
        Write-Host "Error searching/downloading for '$query': $_"
        return $false
    }
}

# Download corrected images
Download-UnsplashImage "men-loafers-shoes" "men_4.png"
Download-UnsplashImage "wooden-shoe-stretchers" "acc_1.png"
Download-UnsplashImage "charcoal-bags" "acc_4.png"
