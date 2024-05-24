class SearchesController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]
    def create
      @search = Search.new(search_details)
      if @search.save
        head :ok
      else
        head :unprocessable_entity
      end
    end
  
    def index
      @searches = Rails.cache.fetch('searches', expires_in: 10.minutes) do
        Search.group(:query, :ip_address).having('count(query) = 1').pluck(:query, :ip_address)
      end
      render json: @searches
    end
  
    private
  
    def search_details
      params.require(:search).permit(:query, :ip_address).merge(ip_address: request.remote_ip)
    end
  end
  