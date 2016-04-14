module UrlHelpers
  def current_page_url
    full_url_for(current_page.url)
  end

  def full_url_for(path)
    if path.start_with?('/')
      "https://www.digitalocean.com#{path}"
    else
      "https://www.digitalocean.com/#{path}"
    end
  end
end
