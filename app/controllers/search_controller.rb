class SearchController < ApplicationController
    def create
        @searcch = Search.new(search_details)
        if @search.save
            head :ok
        else
            head :unprocessable_entity
        end
    end

    def index
        @searches = Search.all
        render json: @searches
    end

    private

    def search_details
        params.require(:search).permit(:query, :ip_address)
    end
end